<?php
function getProfileData($conn)
{
    if (isset($_POST['shooter_id'])) {
        $shooter_id = $_POST['shooter_id'];

        $query = "SELECT schools.name AS schoolName, contests.date, contests.contest_id, c.*
        FROM contesters AS c
        INNER JOIN teams ON c.team_id = teams.team_id
        INNER JOIN contests ON teams.contest_id = contests.contest_id
        INNER JOIN schools ON contests.location = schools.school_id
        WHERE c.shooter_id = ?
        GROUP BY c.team_id ORDER BY contests.date DESC;
        ";

        $stmt = mysqli_prepare($conn, $query);
        $stmt->bind_param('s', $shooter_id);
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