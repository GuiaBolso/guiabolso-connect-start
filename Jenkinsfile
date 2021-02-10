@Library('gb-libs@feature/GBSRE-1057') _

// If is a merge to master.
if (env.BRANCH_NAME == "master") {
    ciKubernetesDeploy {
        jobName = "guiabolso-connect-start"
    }
} 

// If is a pull request.
if (env.CHANGE_ID) {
    ciRunTests {
        junitFilePath = "/opt/app/junit.xml"
    }
}
