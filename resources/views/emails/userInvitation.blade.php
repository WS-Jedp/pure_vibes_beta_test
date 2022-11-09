<!DOCTYPE html>
<head>
    <style>
        .pv-email {
            position: relative;
            display: flex;
            flex-direction: column !important;
            align-items: center;
            justify-content: center;
            padding: 24px;
            width: 100%;
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.15);
            list-style: none;
        }

        .pv-email-container {
            position: relative;
            min-width: 300px;
            width: 81%;
            min-width: 420px;
            padding: 30px;
            margin: 30px;
            flex-direction: column !important;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 9px;
            background-color: #fff;
            box-shadow: 0 0 30px 18px rgba(0, 0, 0, 0.21);
        }
    </style>
</head>
<body class="pv-email">
    <article class="pv-email-container" style="flex-direction: column; min-width: 270px; max-width: 420px;">
        <h3 class="fw-bold fs-2 text-center">
            Dear {{ $userInvited->name }},
        </h3>
        <p class="fw-normal fs-4 text-center">
            You are receiving this email because you have been referred
            to our BETA Testing Program by {{ $invitedBy }}.
        </p>
        <p class="fw-normal fs-4 text-center">
            As an invited user you will be able to login and invite another user, and partcipate for a chance to win a cash prize!
            <ul style="margin: 0; padding: 0;">
                <li style="list-style: none; margin: 0;">
                    <strong>
                        Email:
                    </strong>
                    <p>
                        {{ $userInvited->email }}
                    </p>
                </li>
                <li style="list-style: none; margin: 0;">
                    <strong>
                        Password:
                    </strong>
                    <p>
                        {{ $userPassword }}
                    </p>
                </li>
            </ul>
        <p class="fw-normal fs-4">
            As a beta tester, you have the opportunity to win a cash prize 💸💸 
        </p>

        <ul style="margin: 0; padding: 0;">
            <li style="list-style: none; margin: 0;">
                🥇First- 300 USD
            </li>
            <li style="list-style: none; margin: 0;">
                🥈Second- 200 USD
            </li>
            <li style="list-style: none; margin: 0;">
                🥉Third- 100 USD 
            </li>
        </ul>

        

        <p class="fw-normal fs-4">
            Follow the link to see your 2 options 👀👀
        </p>
        <a class="fw-bold fs-3 text-underline" href="https://dharmabetatest.web.app/invited?email={{ $userInvited->email }}&tmpPass={{$userPassword}}">
            Go to the beta test!
        </a>
    </article>

</body>
</html>