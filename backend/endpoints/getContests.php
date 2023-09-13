<?php
function getContests($conn)
{
    $stmt = $conn->prepare("SELECT contests.contest_id, contests.date, schools.name FROM contests INNER JOIN schools ON contests.location = schools.school_id ");
    $stmt->execute();
    $result = $stmt->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    handleResponse(200, 'Żądanie zostało wykonane pomyślnie.', $data);



}
?>