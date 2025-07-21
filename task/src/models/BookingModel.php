<?php
namespace App\Models;

use App\config\Database;
use PDO;

class BookingModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function createBooking($name, $email, $phone, $people, $date, $time) {
        $query = "INSERT INTO booking (name, email, phone, people, date, time) 
                  VALUES (:name, :email, :phone, :people, :date, :time)";
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':people' => $people,
            ':date' => $date,
            ':time' => $time
        ]);
        return $stmt->rowCount() > 0;
    }
}
?>