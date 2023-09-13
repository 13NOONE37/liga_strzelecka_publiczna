<?php
function getRoundWomen($conn)
{
    if (isset($_POST['contest_id'])) {
        $contest_id = $_POST['contest_id'];

        $query = "SELECT
                contesters.shoot_1,
                contesters.shoot_2,
                contesters.shoot_3,
                contesters.shoot_4,
                contesters.shoot_5,
                contesters.shoot_6,
                contesters.shoot_7,
                contesters.shoot_8,
                contesters.shoot_9,
                contesters.shoot_10,
                shooters.firstName,
                shooters.secondName
            FROM schools
            INNER JOIN shooters ON schools.school_id = shooters.school_id
            INNER JOIN teams ON schools.school_id = teams.school_id
            INNER JOIN contests ON teams.contest_id = contests.contest_id
            INNER JOIN contesters ON teams.team_id = contesters.team_id AND shooters.shooter_id = contesters.shooter_id
            WHERE shooters.isMan = FALSE AND contests.contest_id = ?
            GROUP BY contesters.shooter_id;";

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