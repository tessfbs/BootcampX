SELECT AVG(total_duration) AS average_total_duration 
FROM(
SELECT cohorts.name as cohort_name, sum((completed_at - started_at)) as total_duration
FROM cohorts
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
GROUP BY cohort_name
ORDER BY total_duration
) as total_durations;
