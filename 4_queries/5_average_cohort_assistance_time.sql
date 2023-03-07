SELECT cohorts.name as cohort_name, AVG((completed_at - started_at)) as duration
FROM cohorts
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
GROUP BY cohort_name
ORDER BY duration
LIMIT 5;