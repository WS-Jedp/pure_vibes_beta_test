<?php

namespace App\Models\Utils;

enum ROLES: string {
    case ADMIN = 'admin';
    case TESTER = 'tester';
    case GUEST = 'guest';
};