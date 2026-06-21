'use client';

export default function FeedbackPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%); padding: 20px; min-height: 100vh; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 20px; text-align: center; border-bottom: 3px solid #B8956A; }
        .header h1 { font-size: 32px; color: #B8956A; margin-bottom: 8px; font-weight: bold; letter-spacing: 1.5px; }
        .header p { font-size: 16px; color: #ddd; margin: 8px 0; }
        .header-bangla { font-size: 14px; color: #999; margin-top: 15px; line-height: 1.6; }
        .form-content { padding: 40px; }
        .form-section { margin-bottom: 35px; }
        .section-title { font-size: 18px; font-weight: bold; color: #1a1a1a; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #B8956A; }
        .form-group { margin-bottom: 25px; }
        label { display: block; font-size: 15px; margin-bottom: 10px; color: #333; font-weight: 500; }
        .required { color: #d32f2f; }
        .input-field { width: 100%; padding: 12px 15px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; transition: border-color 0.3s, box-shadow 0.3s; }
        .input-field:focus { outline: none; border-color: #B8956A; box-shadow: 0 0 8px rgba(184, 149, 106, 0.3); background: #fafafa; }
        .checkbox-group { display: flex; flex-direction: column; gap: 12px; }
        .checkbox-option { display: flex; align-items: center; padding: 14px; background: #f9f9f9; border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; }
        .checkbox-option:hover { background: #f0f0f0; border-color: #B8956A; }
        input[type="checkbox"], input[type="radio"] { width: 18px; height: 18px; margin-right: 12px; cursor: pointer; accent-color: #B8956A; flex-shrink: 0; }
        .option-label { cursor: pointer; font-size: 15px; color: #333; flex: 1; }
        textarea { width: 100%; padding: 12px 15px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; resize: vertical; min-height: 120px; transition: border-color 0.3s, box-shadow 0.3s; }
        textarea:focus { outline: none; border-color: #B8956A; box-shadow: 0 0 8px rgba(184, 149, 106, 0.3); background: #fafafa; }
        .rating-group { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px; }
        .rating-label { position: relative; }
        .rating-label input[type="radio"] { display: none; }
        .rating-btn { display: block; padding: 14px; border: 2px solid #ddd; background: white; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold; text-align: center; transition: all 0.3s; }
        .rating-label input[type="radio"]:checked + .rating-btn { background: #B8956A; color: white; border-color: #B8956A; box-shadow: 0 4px 12px rgba(184, 149, 106, 0.3); }
        .rating-btn:hover { border-color: #B8956A; }
        .submit-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #B8956A 0%, #9d7b52 100%); color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s; margin-top: 10px; }
        .submit-btn:hover { box-shadow: 0 6px 18px rgba(184, 149, 106, 0.4); transform: translateY(-2px); }
        .submit-btn:disabled { background: #ccc; cursor: not-allowed; transform: none; }
        .success-message { display: none; margin-top: 20px; padding: 20px; background: #e8f5e9; border-left: 4px solid #4caf50; color: #2e7d32; border-radius: 6px; font-size: 15px; }
        .error-message { display: none; margin-top: 20px; padding: 20px; background: #ffebee; border-left: 4px solid #f44336; color: #c62828; border-radius: 6px; font-size: 15px; }
        .loading { display: none; text-align: center; color: #666; font-size: 14px; }
        .spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid #f3f3f3; border-top: 2px solid #B8956A; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px; vertical-align: middle; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 600px) { .rating-group { grid-template-columns: repeat(2, 1fr); } .header h1 { font-size: 28px; } .form-content { padding: 20px; } }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>NOOR BEAUTY SALON</h1>
          <p>App Testing Feedback Survey</p>
          <div className="header-bangla">আপনার মতামত আমাদের অ্যাপ উন্নত করতে সাহায্য করবে<br/>আপনার মূল্যবান পরামর্শের জন্য ধন্যবাদ</div>
        </div>

        <div className="form-content">
          <form id="feedbackForm">
            <div className="form-section">
              <div className="section-title">১. আপনার তথ্য | Your Information</div>
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input type="text" id="name" name="name" className="input-field" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input type="email" id="email" name="email" className="input-field" placeholder="your.email@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="input-field" placeholder="+880 1XXX XXXXXX" />
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">२. টেস্টিং সময়কাল | Testing Period</div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date <span className="required">*</span></label>
                <input type="date" id="startDate" name="startDate" className="input-field" required />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date <span className="required">*</span></label>
                <input type="date" id="endDate" name="endDate" className="input-field" required />
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">३. কী ভালো লেগেছে? | What Do You Like? (Select All)</div>
              <div className="checkbox-group">
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="User-friendly interface" />
                  <span className="option-label">User-friendly interface / সহজ ইন্টারফেস</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="Fast booking process" />
                  <span className="option-label">Fast booking process / দ্রুত বুকিং</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="Clear service descriptions" />
                  <span className="option-label">Clear service descriptions / পরিষ্কার বিবরণ</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="Easy payment options" />
                  <span className="option-label">Easy payment options / সহজ পেমেন্ট</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="Good app performance" />
                  <span className="option-label">Good app performance / ভালো পারফরম্যান্স</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="Beautiful design" />
                  <span className="option-label">Beautiful design / সুন্দর ডিজাইন</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="likes" value="Appointment notifications" />
                  <span className="option-label">Appointment notifications / নোটিফিকেশন</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">४. উন্নতির জায়গা | What Can Be Improved? (Select All)</div>
              <div className="checkbox-group">
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Slow loading time" />
                  <span className="option-label">Slow loading time / স্লো লোডিং</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Confusing navigation" />
                  <span className="option-label">Confusing navigation / বিভ্রান্তিকর নেভিগেশন</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Bugs or crashes" />
                  <span className="option-label">Bugs or crashes / বাগ বা ক্র্যাশ</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Missing features" />
                  <span className="option-label">Missing features / ফিচার নেই</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Unclear instructions" />
                  <span className="option-label">Unclear instructions / অস্পষ্ট নির্দেশনা</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Payment issues" />
                  <span className="option-label">Payment issues / পেমেন্ট সমস্যা</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" name="improvements" value="Limited Bangla support" />
                  <span className="option-label">Limited Bangla support / বাংলা সাপোর্ট</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">५. সামগ্রিক রেটিং | Overall Experience Rating</div>
              <div className="form-group">
                <label>How would you rate your overall experience? <span className="required">*</span></label>
                <div className="rating-group">
                  <label className="rating-label">
                    <input type="radio" name="rating" value="Excellent" required />
                    <div className="rating-btn">Excellent</div>
                  </label>
                  <label className="rating-label">
                    <input type="radio" name="rating" value="Good" required />
                    <div className="rating-btn">Good</div>
                  </label>
                  <label className="rating-label">
                    <input type="radio" name="rating" value="Average" required />
                    <div className="rating-btn">Average</div>
                  </label>
                  <label className="rating-label">
                    <input type="radio" name="rating" value="Poor" required />
                    <div className="rating-btn">Poor</div>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">६. বিস্তারিত মতামত | Detailed Feedback & Suggestions</div>
              <div className="form-group">
                <label htmlFor="feedback">Please share your thoughts, suggestions, or any issues you faced:</label>
                <textarea id="feedback" name="feedback" placeholder="আপনার মতামত লিখুন..."></textarea>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">७. নতুন ফিচার | Feature Requests</div>
              <div className="form-group">
                <label htmlFor="features">What features would you like to see in the app?</label>
                <textarea id="features" name="features" placeholder="আপনি কী ফিচার চাইবেন?"></textarea>
              </div>
            </div>

            <button type="submit" className="submit-btn" id="submitBtn">Submit Your Feedback</button>
            <div className="loading" id="loadingIndicator">
              <span className="spinner"></span>Submitting your feedback...
            </div>
            <div className="success-message" id="successMessage">
              ✓ Thank you! Your feedback has been submitted successfully. We appreciate your valuable input!
            </div>
            <div className="error-message" id="errorMessage">
              ✗ There was an issue submitting your form. Please try again.
            </div>
          </form>
        </div>
      </div>

      <script>{`
        document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          const submitBtn = document.getElementById('submitBtn');
          const loadingDiv = document.getElementById('loadingIndicator');
          const successDiv = document.getElementById('successMessage');
          const errorDiv = document.getElementById('errorMessage');

          successDiv.style.display = 'none';
          errorDiv.style.display = 'none';
          submitBtn.disabled = true;
          loadingDiv.style.display = 'block';

          const formData = new FormData(this);
          const emailData = {
            name: formData.get('name') || 'N/A',
            email: formData.get('email') || 'N/A',
            phone: formData.get('phone') || 'N/A',
            startDate: formData.get('startDate') || 'N/A',
            endDate: formData.get('endDate') || 'N/A',
            likes: formData.getAll('likes').join(', ') || 'None selected',
            improvements: formData.getAll('improvements').join(', ') || 'None selected',
            rating: formData.get('rating') || 'N/A',
            feedback: formData.get('feedback') || 'N/A',
            features: formData.get('features') || 'N/A',
            submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
          };

          try {
            const response = await fetch('https://formsubmit.co/ajax/azmir@noor-salon.com', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(emailData)
            });

            if (response.ok) {
              loadingDiv.style.display = 'none';
              successDiv.style.display = 'block';
              document.getElementById('feedbackForm').style.display = 'none';
              window.scrollTo(0, 0);
            } else {
              throw new Error('Submission failed');
            }
          } catch (error) {
            console.error('Error:', error);
            loadingDiv.style.display = 'none';
            submitBtn.disabled = false;
            errorDiv.style.display = 'block';
          }
        });
      `}</script>
    </>
  );
}