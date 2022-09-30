var employees = [
    {
        name: "Johnny",
        age: 23,
        occupation: "developer",
        company: "Scotiabank",
        visible: true,
        imageUrl: "person1.jpg"
    },
    {
        name: "Frank",
        age: 40,
        occupation: "Project Manager",
        company: "RBC",
        visible: false,
        imageUrl: "person2.jpg"
    },
    {
        name: "Jane",
        age: 33,
        occupation: "Manager",
        company: "RBC",
        visible: true,
        imageUrl: "person3.jpg"
    }
];

module.exports.getAllEmployees = function() {
    return employees;
};

module.exports.getVisibleEmployees = function() {
    let filtered = [];

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].visible) {
            filtered.push(employees[i]);
        }
    }

    return filtered;
};