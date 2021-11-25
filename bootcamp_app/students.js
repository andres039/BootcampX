const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name as student, cohort_id, cohorts.name as name
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2]}'
LIMIT ${process.argv[3]};
`)
.then(res => {
  
  res.rows.forEach(user => {
    console.log(`${user.student} has an id of ${user.id} and was in the ${user.name} cohort`);
  })
});