const { Pool } = require('pg');
const args = process.argv;

const pool = new Pool({
  user: 'tessfbs',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;  
const cohortName = process.argv[2];
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];


pool.query(queryString, values)
// .then(res => {
//   console.log(res.rows);
// })
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher} `);
  })
})
.catch(err => console.error('query error', err.stack));
