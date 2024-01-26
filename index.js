const express = require('express');
const fs = require('fs');
const Chance = require('chance');
const chance = new Chance();

const app = express();
const port = 4000; 

const users = [];

app.get('/api/users', (req, res) => {
  const numberOfUsers = 10;

  for (let i = 0; i < numberOfUsers; i++) {
    const user = {
      username: chance.name(),  
      gender: chance.gender(),
      email: chance.email(),
      birthdate: chance.birthday(),
      favoriteFruit: chance.pickone(['Apple', 'Banana', 'Orange', 'Strawberry']),
      hobbies: chance.pickset(['Reading', 'Traveling', 'Photography', 'Gaming'], chance.integer({ min: 1, max: 3 })),
      favoriteFood: chance.pickone(['Pizza', 'Sushi', 'Pasta', 'Burger', 'Tacos', 'Salad', 'Ice Cream', 'Curry', 'Steak']),
      skills: chance.pickset(['javascript', 'Python', 'C++', 'Ruby'], chance.integer({ min: 1, max: 3 })),
      instagramFollowers: chance.integer({ min: 0, max: 100 }),
      isActive: chance.bool(),
      interests: {
        outdoor: chance.bool(),
        cooking: chance.bool(),
        music: chance.bool(),
      },
      location: {
        address: chance.address(),
        country: chance.pickone(['USA', 'France', 'India', 'Australia', 'Japan', 'Mexico', 'Canada', 'Italy', 'Belgium']),
      },
    };
    users.push(user);
  }
  const filePath = 'users.json';
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.json(users);
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
