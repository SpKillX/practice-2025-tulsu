<?php
namespace App\Models;

use App\config\Database;
use PDO;

class MenuModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function getMenuItems($category = null) {
        if ($category) {
            $query = "SELECT * FROM delicious_menu WHERE category = :category ORDER BY menu_id";
            $stmt = $this->db->prepare($query);
            $stmt->execute([':category' => $category]);
        } else {
            $query = "SELECT * FROM delicious_menu WHERE on_main = TRUE ORDER BY menu_id LIMIT 21";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
        }
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>