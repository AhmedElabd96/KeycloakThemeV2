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