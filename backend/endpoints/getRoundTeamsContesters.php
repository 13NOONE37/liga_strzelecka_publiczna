<?php
function getRoundTeamsContesters($conn)
{
    if (isset($_POST['contest_id'])) {
        $contest_id = $_POST['contest_id'];

        $query = "SELECT shooters.shooter_id, shooters.firstName, shooters.secondName, teams.team_id
        FROM shooters
        INNER JOIN contesters ON shooters.shooter_id = contesters.shooter_id
        INNER JOIN teams ON contesters.team_id = teams.team_id
        INNER JOIN contests ON teams.contest_id = contests.contest_id
        WHERE contesters.isInTeam = TRUE AND contests.contest_id = ?;";

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