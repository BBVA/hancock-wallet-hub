nodePipeline{

  // ---- DEVELOP ----
  if (env.BRANCH_NAME == 'develop') {

    stage('Install Dependencies'){
      container('node'){
        sh """
          yarn cache clean --force
          yarn install
        """
      }
    }

    stage('Unit tests'){
      container('node'){
        sh """
          yarn run coverage
        """
      }
    }

    //sonar_shuttle_stage()

    docker_shuttle_stage()

    qa_data_shuttle_stage()

    deploy_shuttle_stage(project: "blockchainhub", environment: "develop", askForConfirmation: false)
    
    
  }

  // ---- RELEASE ----
  if (env.BRANCH_NAME =~ 'release/*') {

    stage('Install Dependencies'){
      container('node'){
        sh """
          yarn cache clean --force
          yarn install
        """
      }
    }

    stage('Unit tests'){
      container('node'){
        sh """
          yarn run coverage
        """
      }
    }

    sonar_shuttle_stage()

    check_unlocked_in_RC_shuttle_stage()

    docker_shuttle_stage()

    qa_data_shuttle_stage()

    deploy_shuttle_stage(project: "blockchainhub", environment: "qa", askForConfirmation: false)

    set2rc_shuttle_stage()

    stage ('Functional Tests') {
      build job: '/blockchainhub/kst-hancock-ms-wallet-hub-tests/master'
    }
 
  }
}