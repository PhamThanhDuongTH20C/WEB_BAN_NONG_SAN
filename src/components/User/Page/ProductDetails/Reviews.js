import React, {useState} from 'react'

const Reviews = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <div class="row" id="reviews">
            <div class="col large-12" id="comments">
                <h3 class="normal">Bình luận</h3>
                <p class="woocommerce-noreviews">Chưa có bình luận nào</p>
            </div>
            <div id="review_form_wrapper" class="large-12 col">
                <div id="review_form" class="col-inner">
                    <div class="review-form-inner has-border">
                        <div id="respond" class="comment-respond">
                            {/* <h3 id="reply-title" class="comment-reply-title">Hãy là người đầu tiên nhận xét “Cá Trác vàng biển Ích Hữu 400g”
                                <small>
                                    <a rel="nofollow" id="cancel-comment-reply-link" href="/happytrade/san-pham/ca-trac-vang-bien-ich-huu-400g/#respond" style={{ display: 'none' }}>Hủy</a>
                                </small>
                            </h3> */}
                            <form action="http://mauweb.monamedia.net/happytrade/wp-comments-post.php" method="post" id="commentform" class="comment-form" novalidate="">
                                {/* <div class="comment-form-rating">
                                    <label for="rating">Đánh giá của bạn</label>
                                    <p class="stars">
                                        <span>
                                            <a class="star-1" href="#">1</a>
                                            <a class="star-2" href="#">2</a>
                                            <a class="star-3" href="#">3</a>
                                            <a class="star-4" href="#">4</a>
                                            <a class="star-5" href="#">5</a>
                                        </span>
                                    </p>
                                    <select name="rating" id="rating" required="" style={{ display: 'none' }}>
                                        <option >Xếp hạng…</option>
                                        <option >Rất tốt</option>
                                        <option >Tốt</option>
                                        <option >Trung bình</option>
                                        <option >Không tệ</option>
                                        <option >Rất tệ</option>
                                    </select>
                                </div> */}
                                <p class="comment-form-comment">
                                    <label for="comment">Nhận xét của bạn&nbsp;<span class="required">*</span>
                                    </label>
                                    <textarea id="comment" name="comment" cols="45" rows="8" required="">
                                    </textarea></p><p class="comment-form-author">
                                    <label for="author">Tên&nbsp;<span class="required">*</span>
                                    </label>
                                    <input id="author" name="author" type="text" size="30" required="" />
                                </p>
                                <p class="comment-form-email">
                                    <label for="email">Email&nbsp;<span class="required">*</span>
                                    </label>
                                    <input id="email" name="email" type="email" size="30" required="" />

                                </p>
                                <p class="form-submit"><input name="submit" type="submit" id="submit" class="submit" value="Gửi đi" />
                                    <input type="hidden" name="comment_post_ID" id="comment_post_ID" />
                                    <input type="hidden" name="comment_parent" id="comment_parent" />
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews