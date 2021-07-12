<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Company
 * @package App\Models
 */
class Company extends Model
{
    use HasFactory;

    /**
     * Model fillables.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'country_id'
    ];

    /**
     * Country relation
     *
     * @return belongsTo
     */
    public function country(): belongsTo
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Mining relation
     *
     * @return hasMany
     */
    public function mining(): hasMany
    {
        return $this->hasMany(Mining::class);
    }
}
