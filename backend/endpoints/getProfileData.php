<?php
function getProfileData($conn)
{
    if (isset($_POST['shooter_id'])) {
        $shooter_id = $_POST['shooter_id'];

        $query = "SELECT c.*, contests.date, contests.contest_id FROM contesters as c INNER JOIN contests INNER JOIN teams ON
        teams.team_id = c.team_id AND teams.contest_id = contests.contest_id WHERE
        c.shooter_id=?;";

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