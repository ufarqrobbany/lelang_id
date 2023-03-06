<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\MasyarakatModel;

class Masyarakat extends ResourceController
{
    /**
     * cek email sudah terdaftar di dalam tabel masyarakat atau belum
     *
     * @return mixed
     */
    public function index()
    {
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
    }

    /**
     * @return mixed
     */
    public function check()
    {
        helper(['form']);
        $rules = [
            'email' => 'required|is_unique[tb_masyarakat.email]',
        ];
        if (!$this->validate($rules)) {
            return $this->respond([
                'success' => false,
                'message' => 'Email sudah terdaftar, gunakan email lain'
            ]);
        } else {
            // $data = [
            //     'email' => $this->request->getVar('email'),
            // ];
            // $model = new MasyarakatModel();
            // $model->save($data);
            $response = [
                'success' => true,
                'message' => ''
            ];
            return $this->respond($response);
        }
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
        $rules = [
            'fullname'      => 'required|alpha',
            'username'      => 'required|min_length[6]|alpha_dash',
            'email'         => 'required',
            'phone'         => 'required',
            'password'      => 'required',
            'confirmpass'   => 'required|matches[password]',
            'gender'        => 'required|in_list[Male,Female]',
            'age'           => 'required|is_natural_no_zero',
        ];
        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $data = [
            'fullname'     => $this->request->getVar('fullname'),
            'username'     => $this->request->getVar('username'),
            'email'        => $this->request->getVar('email'),
            'phone'        => $this->request->getVar('phone'),
            'password'     => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'gender'        => $this->request->getVar('gender'),
            'age'        => $this->request->getVar('age'),
        ];
        $model = new MasyarakatModel();
        $registered = $model->save($data);
        $this->respondCreated($registered);
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }
}
