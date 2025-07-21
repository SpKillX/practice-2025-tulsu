<?php
namespace App\Controllers;

use App\Models\SpecialtiesModel;

class SpecialtiesController {
    private $specialtiesModel;

    public function __construct() {
        $this->specialtiesModel = new SpecialtiesModel();
    }

    public function getSpecialties() {
        header('Content-Type: application/json');
        echo json_encode($this->specialtiesModel->getSpecialtiesContent());
    }
}
?>