<?php
function handleResponse($code, $message, $data = null){
    http_response_code($code);
    echo json_encode(array('message' => $message, 'data'=>$data));
}

?>