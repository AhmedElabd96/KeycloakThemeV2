<#import "template.ftl" as layout>
    <#include "timeFormattingLogic.ftl">
        <#-- Construct formatted date string -->
            <@layout.emailLayout>
                <html lang="en">

                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>FGIC</title>
                    <style>
                    .fg-body-wrapper {
                        margin: auto;
                        max-width: 1366px;
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
                        margin: 0 auto;
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
                            <img src="${properties.baseUrl}/email-templates/templates/fgic/logo.PNG" alt="FGIC" />
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