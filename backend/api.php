<?php
session_start();
require('functions/handleResponse.php');
require('endpoints/getContests.php');
require('endpoints/getGeneralTeams.php');
require('endpoints/getGeneralWomen.php');
require('endpoints/getGeneralMen.php');
require('endpoints/getRoundMen.php');
require('endpoints/getRoundWomen.php');
require('endpoints/getRoundTeamsResult.php');
require('endpoints/getRoundTeamsContesters.php');
require('endpoints/getProfileData.php');
require('endpoints/getUserName.php');

$host = 'localhost'; //zmienić w zależności od ustawień bazy
$username = 'root'; //zmienić w zależności od ustawień bazy
$password = ''; //zmienić w zależności od ustawień bazy
$database = ''; //zmienić w zależności od ustawień bazy
$url = 'localhost'; //zmienić w zależności od serwera

$conn = mysqli_connect($host, $username, $password, $database);
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


header('Content-Type: application/json');
header("Access-Control-Allow-Origin: $url");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'getContests':
                getContests($conn);
                break;
            case 'getGeneralTeams':
                getGeneralTeams($conn);
                break;
            case 'getGeneralWomen':
                getGeneralWomen($conn);
                break;
            case 'getGeneralMen':
                getGeneralMen($conn);
                break;

            case 'getRoundMen':
                getRoundMen($conn);
                break;
            case 'getRoundWomen':
                getRoundWomen($conn);
                break;
            case 'getRoundTeamsResult':
                getRoundTeamsResult($conn);
                break;
            case 'getRoundTeamsContesters':
                getRoundTeamsContesters($conn);
                break;
            case 'getProfileData':
                getProfileData($conn);
                break;
            case 'getUserName':
                getUserName($conn);
                break;

            default:
                handleResponse(404, 'Żądanie nieznane');
                break;
        }
    } else {
        handleResponse(400, 'Żądanie jest niekompletne');
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header('Location: index.html');
} else {
    handleResponse(405, 'Nieprawidłowa metoda żądania');
}
?>