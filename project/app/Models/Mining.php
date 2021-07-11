<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Mining
 * @package App\Models
 */
class Mining extends Model
{
    use HasFactory;

    /**
     * Model fillables.
     *
     * @var array
     */
    protected $fillable = [
        'company_id',
        'mined',
        'date_mined',
    ];

    /**
     * Cast some data.
     *
     * @var array
     */
    protected $casts = [
        'mined' => 'integer'
    ];

    /**
     * Company relation
     *
     * @return belongsTo
     */
    public function company(): belongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
