// Vec3 = function(x,y,z)
// {
//     this.x = x;
//     this.y = y;
//     this.z = z;
// }

// Vec3.prototype.add = function(v)
// {
//     this.x += v.x;
//     this.y += v.y;
//     this.z += v.z;
//     return this;
// }

// Vec3.prototype.sum = function(v)
// {
//     return this.x + this.y + this.z;
// }

class Vec3
{
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sum()
    {
        return this.x + this.y + this.z;
    }

    min(){
        if(this.x < this.y){
            if(this.x < this.z) return this.x;
            else return this.z;
        }
        else if(this.y < this.z) return this.y;
        else return this.z;
        // const m =  this.x < this.y ? this.x : this.y;
        // return m < this.z ? m : this.z;
    }

    max(){
        if(this.x >= this.y){
            if(this.x >= this.z) return this.x;
            else return this.z;
        }
        else if(this.y >= this.z) return this.y;
        else return this.z;
        // const m = this.x > this.y ? this.x : this.y;
        // return m > this.z ? this.z : m;
    }

    mid(){
        return this.sum() - this.min() - this.max();
    }

    red(v){
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    
    abs(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
    }
}

