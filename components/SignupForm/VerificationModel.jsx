import React from 'react'
import style from "../../styles/MajorForm.module.css";

export default function VerificationModel({ email }) {
    return (
        <div role="alert" className={style.verificationModel}>
            <div class="flex items-start gap-4">
                <span class="text-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-8 w-8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </span>

                <div className={style.modelHeaderDiv}>
                    <h5 >Verify Email</h5>

                    <p>
                        We have sent you verification link on {email && email} address you need to click on that link to verify your account
                    </p>
                </div>

            </div>
        </div>
    )
}
