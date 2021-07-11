<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Country
 * @package App\Models
 */
class Country extends Model
{
    use HasFactory;

    /**
     * Model fillables.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'plan',
    ];

    /**
     * Cast some data.
     *
     * @var array
     */
    protected $casts = [
        'plan' => 'integer'
    ];

    /**
     * Companies relation
     *
     * @return hasMany
     */
    public function companies(): hasMany
    {
        return $this->hasMany(Company::class);
    }
}
