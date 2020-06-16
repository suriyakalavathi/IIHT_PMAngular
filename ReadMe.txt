Application structure & steps to build and run
  
1.	Deliverables
	Angular based UI - ZIP file
	Spring Boot based API/Service, - ZIP file & Docker Image
	Additional Info
		MySQL should run
		Refer application.properties & application-test.properties in resources folder for instructions
2.	GitHub
	Source code is available in below GitHub. 
		UI: https://github.com/Suriyakalavathi/IIHT_PMAngular
		API/Service: https://github.com/Suriyakalavathi/IIHT_PMSpringBoot_Service
3.	Execution Steps
		Start MySQL - //localhost:3306/pm
		Run API/Service from STS
		Open Config and get the application up and running
		2020-05-29 00:03:34.206  INFO USDC2P7Y2 --- [  restartedMain] o.s.b.w.e.t.TomcatWebServer              : Tomcat started on port(s): 8080 (http) with context path ''
2020-05-29 00:03:34.207  INFO USDC2P7Y2 --- [  restartedMain] h.c.p.ProjectManagerApplication          : Started ProjectManagerApplication in 9.414 seconds (JVM running for 2042.707)
2020-05-29 00:03:34.210  INFO USDC2P7Y2 --- [  restartedMain] .ConditionEvaluationDeltaLoggingListener : Condition evaluation unchanged
		Run the UI application from terminal in Visual Source Code using ng serve -o
4.	Access the application from the browser using :  http://localhost:4200/
