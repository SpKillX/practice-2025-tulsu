<?php
// Suppress PHP warnings/errors in output to prevent invalid JSON
ob_start();
require __DIR__ . '/../../vendor/autoload.php';

use App\Controllers\AboutController;
use App\Controllers\TeamController;
use App\Controllers\BookingController;
use App\Controllers\SpecialtiesController;
use App\Controllers\MenuController;
use App\Controllers\ContactController;
use App\Controllers\AuthController;
use App\Controllers\EventsController;

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

try {
    if ($uri === '/api/about' && $method === 'GET') {
        $controller = new AboutController();
        $controller->getAbout();
    } elseif ($uri === '/api/about' && $method === 'POST') {
        $controller = new AboutController();
        $controller->updateAbout();
    } elseif ($uri === '/api/team' && $method === 'GET') {
        $controller = new TeamController();
        $controller->getTeam();
    } elseif ($uri === '/api/team' && $method === 'POST') {
        $controller = new TeamController();
        $controller->updateTeam();
    } elseif ($uri === '/api/booking' && $method === 'POST') {
        $controller = new BookingController();
        $controller->createBooking();
    } elseif ($uri === '/api/specialties' && $method === 'GET') {
        $controller = new SpecialtiesController();
        $controller->getSpecialties();
    } elseif ($uri === '/api/menu' && $method === 'GET') {
        $controller = new MenuController();
        $controller->getMenuItems();
    } elseif ($uri === '/api/contact' && $method === 'POST') {
        $controller = new ContactController();
        $controller->createContact();
    } elseif ($uri === '/api/login' && $method === 'POST') {
        $controller = new AuthController();
        $controller->login();
    } elseif ($uri === '/api/register' && $method === 'POST') {
        $controller = new AuthController();
        $controller->register();
    } elseif ($uri === '/api/forgot-password' && $method === 'POST') {
        $controller = new AuthController();
        $controller->requestPasswordReset();
    } elseif ($uri === '/api/verify-code' && $method === 'POST') {
        $controller = new AuthController();
        $controller->verifyResetCode();
    } elseif ($uri === '/api/reset-password' && $method === 'POST') {
        $controller = new AuthController();
        $controller->resetPassword();
    } elseif ($uri === '/api/events' && $method === 'GET') {
        $controller = new EventsController();
        $controller->getEvents();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
} catch (\Exception $e) {
    error_log('API: Global error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

ob_end_flush();
?>