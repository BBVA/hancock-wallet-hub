def install_dependencies() {
  stage('Install Dependencies'){
    container('node'){
      sh """
        yarn cache clean --force
        yarn install
      """
    }
  }
}

def lint() {
  stage('Linter'){
    container('node'){
      sh """
        yarn run lint
      """
    }
  }
}

def docs() {
  stage('Docs'){
    container('node'){
      sh "yarn run docs"
      upload_doc_shuttle_stage(docName: "docs", docPath: "./documentation")
    }
  }
}

def unit_tests() {
  stage('Unit tests'){
    container('node'){
      sh """
        yarn run coverage
      """
    }
  }
}

nodePipeline{

  // ---- DEVELOP ----
  if (env.BRANCH_NAME == 'develop') {
  
    // sonar_shuttle_stage()
    //sonar_shuttle_stage( exclusions: './node_modules')
    
    install_dependencies()
    
    lint()

    unit_tests()

    docs()

    docker_shuttle_stage()

    qa_data_shuttle_stage()

    deploy_shuttle_stage(project: "hancock", environment: "develop", askForConfirmation: false)
    
    
  }

  // ---- RELEASE ----
  if (env.BRANCH_NAME =~ 'release/*') {

    // sonar_shuttle_stage()
  
    install_dependencies()

    lint()

    unit_tests()

    docs()

    check_unlocked_in_RC_shuttle_stage()

    docker_shuttle_stage()

    qa_data_shuttle_stage()
    
    logic_label_shuttle_stage()

    deploy_shuttle_stage(project: "hancock", environment: "qa", askForConfirmation: false)

    set2rc_shuttle_stage()

    stage ('Functional Tests') {
      build job: '/blockchainhub/kst-hancock-ms-wallet-hub-tests/master'
    }
 
  }

  // ---- DEMO ----
  if (env.BRANCH_NAME == 'demo') {

    docker_shuttle_stage()

    deploy_shuttle_stage(project: "blockchainhub", environment: "demo", askForConfirmation: false)

  }
}
