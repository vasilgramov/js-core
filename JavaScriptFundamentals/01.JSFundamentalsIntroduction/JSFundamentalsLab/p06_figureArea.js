/**
 * Created by vladix on 5/22/17.
 */
function figureArea(w, h, W, H) {
    let [s1, s2, s3] = [w * h, W * H,
        Math.min(w, W) * Math.min(h, H)];
    return s1 + s2 - s3;
}

area(13, 2, 5, 8);