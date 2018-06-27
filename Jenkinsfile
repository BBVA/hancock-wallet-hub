nodePipeline{

  // ---- DEVELOP ----
  if (env.BRANCH_NAME == 'develop') {

    docker_shuttle_stage()

    // qa_data_shuttle_stage()

    deploy_shuttle_stage(project: "blockchainhub", environment: "develop", askForConfirmation: false)
    
    
  }

  // ---- RELEASE ----
  if (env.BRANCH_NAME =~ 'release/*') {

    docker_shuttle_stage()

    qa_data_shuttle_stage()

    deploy_shuttle_stage(project: "blockchainhub", environment: "qa", askForConfirmation: false)

    stage ('Starting Functional Tests') {
      build job: '/BlockchainHub/kst-hancock-ms-wallet-hub-tests/master'
    }

  }
}