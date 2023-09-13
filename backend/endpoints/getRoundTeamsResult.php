<?php
function getRoundTeamsResult($conn)
{
    if (isset($_POST['contest_id'])) {
        $contest_id = $_POST['contest_id'];

        $query = "SELECT schools.name, teams.school_id, teams.team_id,
        SUM(contesters.shoot_1 + contesters.shoot_2 + contesters.shoot_3 + contesters.shoot_4 +
            contesters.shoot_5 + contesters.shoot_6 + contesters.shoot_7 + contesters.shoot_8 +
            contesters.shoot_9 + contesters.shoot_10) AS result,
        SUM(CASE WHEN contesters.shoot_1 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_2 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_3 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_4 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_5 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_6 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_7 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_8 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_9 = 10 THEN 1 ELSE 0 END +
            CASE WHEN contesters.shoot_10 = 10 THEN 1 ELSE 0 END) AS tens
 FROM schools
 INNER JOIN shooters ON schools.school_id = shooters.school_id
 INNER JOIN teams ON schools.school_id = teams.school_id
 INNER JOIN contests ON teams.contest_id = contests.contest_id
 INNER JOIN contesters ON teams.team_id = contesters.team_id AND shooters.shooter_id = contesters.shooter_id
 WHERE contests.contest_id = ? AND contesters.isInTeam = TRUE
 GROUP BY  teams.school_id
 ORDER BY Result DESC;";

        $stmt = mysqli_prepare($conn, $query);
        $stmt->bind_param('s', $contest_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        handleResponse(200, 'Żądanie zostało wykonane pomyślnie.', $data);
    } else {
        handleResponse(400, 'Żądanie jest niekompletne');
    }
}
?>