function vector(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

function vectorProduct(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}

function sameSign(a, b) {
    return (a ^ b) >= 0;    //判断数值符号相同
}

/*
二维向量叉乘
a(x1,y1)*b(x2,y2)=x1*y2-x2*y1
*/
function isPointInTrangle(p, a, b, c) {  //判断点是否在三角形内
    let pa = vector(p, a);
    let pb = vector(p, b);
    let pc = vector(p, c);

    let t1 = vectorProduct(pa, pb);
    let t2 = vectorProduct(pb, pc);
    let t3 = vectorProduct(pc, pa);
    return sameSign(t1, t2) && sameSign(t2, t3);
}

function needDelay(elem, leftCorner, currMousePos) {
    let offset = elem.offset();

    let topLeft = {
        x: offset.left,
        y: offset.top
    }
    let bottomLeft = {
        x: offset.left,
        y: offset.top + elem.height()
    }

    return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft);
}