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
    <@layout.emailLayout>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                    ${kcSanitize(msg("emailVerificationBodyHtml_en",link, realmName, formatExpirationDurationEN(linkExpiration)))?no_esc}
                </td>
                <td style="width: 1px; background-color: #ccc;"></td>
                <td style="width: 50%; vertical-align: top;">
                    ${kcSanitize(msg("emailVerificationBodyHtml_ar",link, realmName, formatExpirationDurationAR(linkExpiration)))?no_esc}
                </td>
            </tr>
        </table>
    </@layout.emailLayout>