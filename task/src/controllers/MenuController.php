<?php
namespace App\Controllers;

use App\Models\MenuModel;

class MenuController {
    private $menuModel;

    public function __construct() {
        $this->menuModel = new MenuModel();
    }

    public function getMenuItems() {
        header('Content-Type: application/json');
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        file_put_contents('php://stderr', print_r(['category' => $category], true));
        $items = $this->menuModel->getMenuItems($category);
        $items = array_map(function($item) {
            $item['price'] = (float)$item['price'];
            return $item;
        }, $items);
        echo json_encode($items);
    }
}
?>