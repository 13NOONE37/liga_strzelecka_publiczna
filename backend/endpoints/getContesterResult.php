<?php
function getContesterResult($conn)
{
    if (isset($_POST['contest_id'])) {
        $contest_id = $_POST['contest_id'];
        $query = "SELECT c.*
            FROM contesters AS c
            INNER JOIN teams AS t ON c.team_id = t.team_id
            WHERE t.contest_id = ?;";
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