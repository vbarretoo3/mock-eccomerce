const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const db = admin.firestore()

exports.userAdd = functions.auth.user().onCreate(user => {
    var userData = {
        contact: {
            email: user.email,
            phone: ''
        },
        address: {
            address: '',
            city: '',
            province: '',
            postal: '',
        },
        name: '',
        status: 'customer'
    }
    return db.collection("customers").doc(user.uid).set(userData)
})

exports.updateUser = functions.firestore
    .document("customers/{userID}")
    .onUpdate(async(snapshot, context) => {
        const userID = context.params.userID
        const before = snapshot.before.data()
        const after = snapshot.after.data()

        const orderArr = []
        const orderRef = db.collection('orders')
        const docSnap = await orderRef.get()
        docSnap.forEach(doc => {
            orderArr.push({id: doc.id, data: doc.data()})
        })
        orderArr.forEach(order => {
            if (order.data.customer.name === before.name)
            db.collection("orders").doc(order.id).update({
                'customer.name': after.name,
                'customer.customerRef': userID,
                'customer.contact': after.contact,
                'customer.address': after.address,

            })
        })
    })

exports.updateVendor = functions.firestore
    .document("vendors/{vendorID}")
    .onUpdate(async(snapshot, context) => {
    const vendorID = context.params.vendorID
    const before = snapshot.before.data()
    const after = snapshot.after.data()

    const poArr = []
    const poRef = db.collection('po')
    const docSnap = await poRef.get()
    docSnap.forEach(doc => {
        poArr.push({id: doc.id, data: doc.data()})
    })
    poArr.forEach(po => {
        if (po.data.vendor.name === before.name)
        db.collection("po").doc(po.id).update({
            'vendor.name': after.name,
            'vendor.vendorRef': vendorID,
            'vendor.contact': after.contact,
            'vendor.address': after.address,

        })
    })
})

exports.updateItem = functions.firestore
    .document("inventory/{itemID}")
    .onUpdate(async(snapshot, context) => {
    const itemID = context.params.itemID
    const before = snapshot.before.data()
    const after = snapshot.after.data()

    const poArr = []
    const poRef = db.collection('po')
    const poSnap = await poRef.get()
    poSnap.forEach(doc => {
        poArr.push({id: doc.id, data: doc.data()})
    })
    const orderArr = []
    const orderRef = db.collection('orders')
    const orderSnap = await orderRef.get()
    orderSnap.forEach(doc => {
        orderArr.push({id: doc.id, data: doc.data()})
    })

    poArr.forEach(po => {
        var subtotal = 0
        const oldPOArr = []
        po.data.item.forEach(item => {
            oldPOArr.push(item)
        })
        for (let i in oldPOArr) {
            if (oldPOArr[i].itemRef === itemID) {
                const data = {
                    category: after.category,
                    itemRef: itemID,
                    name: after.name,
                    price: after.cost,
                    quantity: oldPOArr[i].quantity,
                }
                oldPOArr.splice(i, 1, data)
                db.collection("po").doc(po.id).update({
                    item: oldPOArr
                })
            }
            const key = Object.keys(oldPOArr[i].quantity)[0]
            var size = oldPOArr[i].quantity
            if (oldPOArr[i].itemRef === itemID) {
                var subtotal = subtotal + (size[key] * after.cost)
            } else {
                var subtotal = subtotal + (size[key] * oldPOArr[i].price)
            }
            console.log(subtotal)
        }
        db.collection("po").doc(po.id).update({
            subtotal: Number((subtotal.toFixed(2))),
            tax: Number((subtotal * .13).toFixed(2)),
            total: Number((subtotal * 1.13).toFixed(2)),
        })
    })

    orderArr.forEach(order => {
        var subtotal = 0
        const oldOrderArr = []
        order.data.item.forEach(item => {
            oldOrderArr.push(item)
        })
        for (let i in oldOrderArr) {
            if (oldOrderArr[i].itemRef === itemID) {
                const data = {
                    category: after.category,
                    itemRef: itemID,
                    name: after.name,
                    price: after.price,
                    quantity: oldOrderArr[i].quantity,
                }
                oldOrderArr.splice(i, 1, data)
                db.collection("orders").doc(order.id).update({
                    item: oldOrderArr
                })
            }
            const key = Object.keys(oldOrderArr[i].quantity)[0]
            var size = oldOrderArr[i].quantity
            if (oldOrderArr[i].itemRef === itemID) {
                var subtotal = subtotal + (size[key] * after.price)
            } else {
                var subtotal = subtotal + (size[key] * oldOrderArr[i].price)
            }
        }
        db.collection("orders").doc(order.id).update({
            subtotal: Number((subtotal.toFixed(2))),
            tax: Number((subtotal * .13).toFixed(2)),
            total: Number((subtotal * 1.13).toFixed(2)),
        })
    })
})