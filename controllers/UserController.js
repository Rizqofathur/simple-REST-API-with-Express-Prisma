const express = require('express');
const prisma = require('../prisma/client');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');

const findUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    res.status(200).send({
      success: true,
      message: 'Get all users successfully!',
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

// function createUser
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.status(200).send({
      success: true,
      message: 'User create successfully!',
      data: user,
    });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error!',
    });
  }
};

// fungsi untuk findUser
const findUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).send({
      success: true,
      message: `Get user by ${id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server errror',
    });
  }
};

// fungsi updateUser
const updateUser = async (req, res) => {
  const id = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error!',
      errors: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send({
      success: true,
      message: 'Data deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { findUsers, createUser, findUserById, updateUser, deleteUser };
