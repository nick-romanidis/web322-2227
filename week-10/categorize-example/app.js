var things = [
    {
        category: 'school',
        name: 'book'
    },
    {
        category: 'school',
        name: 'pencil'
    },
    {
        category: 'cars',
        name: 'mercedes'
    },
    {
        category: 'cars',
        name: 'acura'
    },
    {
        category: 'school',
        name: 'eraser'
    },
    {
        category: 'cars',
        name: 'ford'
    },
    {
        category: 'school',
        name: 'desk'
    }
];

// "categories" is an array and will contain objects with the following properties:
//   [{
//    category - Name of the category
//    items    - An array of the "things" from above that fit in the category.
//   }]


// Categorized using JS reduce()
// Categorized using JS map()

// Categorized manually

let categories = [];

for (i = 0; i < things.length; i++) {
    const currentThing = things[i];
    const categoryName = currentThing.category;

    let category = categories.find(c => c.category == categoryName);

    if (!category) {
        category = {
            category: categoryName,
            items: []
        };

        categories.push(category);
    }

    category.items.push(currentThing);
}

console.log(categories);

// res.render("things", { categories });

/*
<h1>school</h1>
  <h2>book</h2>
  <h2>pencil</h2>
  <h2>eraser</h2>
  <h2>desk</h2>

<h1>cars</h1>
  <h2>mercedes</h2>
  <h2>acura</h2>
  <h2>ford</h2> 
*/

/*
    {{#each categories}}
        <h1>{{category}}</h1>
        {{#each items}}
            <h2>{{name}}</h2>
        {{/each}}
    {{/each}}
*/