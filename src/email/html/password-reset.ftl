<#import "template.ftl" as layout>
    <#function formatExpirationDurationAR minutes>
        <#assign duration=minutes>
            <#assign unit="">
                <#if minutes < 60>
                    <#if minutes==1>
                        <#assign unit="دقيقة">
                            <#assign duration="">
                                <#elseif minutes <=10>
                                    <#assign unit="دقائق">
                                        <#else>
                                            <#assign unit="دقيقة">
                    </#if>
                    <#elseif (minutes>= 60)>
                        <#assign duration=duration / 60>
                            <#if minutes==60>
                                <#assign unit="ساعة">
                                    <#assign duration="">
                                        <#elseif minutes==120>
                                            <#assign unit="ساعتين">
                                                <#assign duration="">
                                                    <#elseif (minutes <=600)>
                                                        <#assign unit="ساعات">
                                                            <#else>
                                                                <#assign unit="ساعة">
                            </#if>
                </#if>
                <#return duration + " " + unit>
    </#function>
    <#function formatExpirationDurationEN minutes>
        <#assign duration=minutes>
            <#assign unit="">
                <#if minutes < 60>
                    <#if minutes==1>
                        <#assign unit="minute">
                            <#else>
                                <#assign unit="minutes">
                    </#if>
                    <#elseif (minutes>= 60)>
                        <#assign duration=duration / 60>
                            <#if minutes==60>
                                <#assign unit="hour">
                                    <#else>
                                        <#assign unit="hours">
                            </#if>
                </#if>
                <#return duration + " " + unit>
    </#function>
    <#assign currentDate=.now>
        <#-- Define Arabic month names -->
            <#assign arabicMonthNames=["يناير", "فبراير" , "مارس" , "إبريل" , "مايو" , "يونيو" , "يوليو" , "أغسطس" , "سبتمبر" , "أكتوبر" , "نوفمبر" , "ديسمبر" ]>
                <#-- Extract date components -->
                    <#assign monthNumber=currentDate?string["M"]>
                        <#assign month=currentDate?string["MMMM"]>
                            <#assign day=currentDate?string["dd"]>
                                <#assign year=currentDate?string["YYYY"]>
                                    <#assign arabicMonth=arabicMonthNames[monthNumber?number - 1]>
                                        <#assign englishFullDate=day + " " + month + " " + year>
                                            <#assign arabicFullData=day + " " + arabicMonth + " " + year>
                                                <#-- Construct formatted date string -->
                                                    <@layout.emailLayout>
                                                        <html lang="en">

                                                        <head>
                                                            <meta charset="UTF-8" />
                                                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                                            <title>FGIC</title>
                                                            <style>
                                                            .fg-body-wrapper {
                                                                width: 580px;
                                                                margin: auto;
                                                            }

                                                            .fg-header {
                                                                display: flex;
                                                                justify-content: center;
                                                                padding: 2rem 5rem;
                                                                align-items: center;
                                                            }

                                                            .fg-header img {
                                                                width: 300px;
                                                                height: auto;
                                                            }

                                                            .fg-date-header {
                                                                display: flex;
                                                                justify-content: space-between;
                                                                background-color: rgb(231, 88, 0);
                                                                padding: 0.5rem 5rem;
                                                                color: white;
                                                            }

                                                            .fg-body {
                                                                padding: 2rem 1.5rem;
                                                                background-color: rgb(242, 249, 255);
                                                                align-items: center;
                                                            }

                                                            .fg-body>div {
                                                                margin-top: 20px;
                                                            }

                                                            .ar {
                                                                direction: rtl;
                                                            }

                                                            .fg-social {
                                                                padding: 2rem 5rem;
                                                                background-color: rgb(242, 249, 255);
                                                                border-top: 1px solid rgb(193, 193, 193);
                                                                border-bottom: 1px solid rgb(193, 193, 193);
                                                                display: flex;
                                                                flex-direction: column;
                                                                align-items: center;
                                                            }

                                                            .fg-social-icons {
                                                                margin-top: 1rem;
                                                            }

                                                            .fg-footer {
                                                                text-align: center;
                                                                padding-top: 1rem;
                                                                padding-bottom: 1rem;
                                                                color: rgb(138, 138, 138);
                                                            }
                                                            </style>
                                                        </head>

                                                        <body>
                                                            <div class="fg-body-wrapper">
                                                                <div class="fg-header">
                                                                    <img src="${url.resourcesUrl}/img/FgicLogo.png" alt="FGIC" />
                                                                </div>
                                                                <div class="fg-date-header">
                                                                    <div style="margin: 0 auto 0 0;">
                                                                        ${englishFullDate}
                                                                    </div>
                                                                    <div style="margin: 0 0 0 auto; direction: rtl;">
                                                                        ${arabicFullData}
                                                                    </div>
                                                                </div>
                                                                <div class="fg-body">
                                                                    <div class="en">
                                                                        ${kcSanitize(msg("passwordResetBodyHtml_EN",link, realmName, formatExpirationDurationEN(linkExpiration)))?no_esc}
                                                                    </div>
                                                                    <hr style="width: 100%;color: black;">
                                                                    <div class="ar">
                                                                        ${kcSanitize(msg("passwordResetBodyHtml_AR",link, realmName, formatExpirationDurationAR(linkExpiration)))?no_esc}
                                                                    </div>
                                                                </div>
                                                                <div class="fg-footer">
                                                                    <div style="width: 100%;">
                                                                        ${msg("copyRights")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </body>

                                                        </html>
                                                    </@layout.emailLayout>