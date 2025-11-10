use("students");

db.createCollection("informationTechnology");

// inserting a single document

db.informationTechnology.insertOne(
    {
        name: "Jayavel",
        age: 20,
        gender: "Male",
        isSalesforceFinished: true,

    }
)

// inserting multiple document
db.informationTechnology.insertMany(
    [
        {
            name: "Sanjay",
            age: 19,
            gender: "Male",
            isSalesforceFinished: true,
        },
        {
            name: "Infant Akash",
            age: 21,
            gender: "Male",
            isSalesforceFinished: true,
        },
        {
            name: "Tamil Selvan",
            age: 22,
            gender: "Male",
            isSalesforceFinished: false,
        },
        {
            name: "Sofia",
            age: 20,
            gender: "Female",
            isSalesforceFinished: false,
        }
    ]
)

// finding the documents
// db.informationTechnology.find();

db.students.find({ age: 22 })
