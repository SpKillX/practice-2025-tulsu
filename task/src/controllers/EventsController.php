<?php
namespace App\Controllers;

use App\Models\EventsModel;

class EventsController {
    private $eventsModel;

    public function __construct() {
        $this->eventsModel = new EventsModel();
    }

    public function getEvents() {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $events = $this->eventsModel->getEvents();
            http_response_code(200);
            echo json_encode(['message' => 'Events fetched successfully', 'events' => $events]);
        } catch (\Exception $e) {
            error_log('EventsController: Get events error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }
}
?>