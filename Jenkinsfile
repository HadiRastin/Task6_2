pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'pro_prac'
    }

    stages {
        stage('Ensure Docker Daemon is Running') {
            steps {
                script {
                    def dockerStatus = sh(script: 'docker info', returnStatus: true)
                    if (dockerStatus != 0) {
                        error 'Docker daemon is not running. Please start Docker Desktop on the Jenkins server.'
                    } else {
                        echo 'Docker daemon is running.'
                    }
                }
            }
        }

        stage('Clone the code') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/HadiRastin/Task6_2'
                    echo 'Code cloned successfully'
                }
            }
        }

        stage('Initialize') {
            steps {
                script {
                    def dockerHome = tool 'myDocker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Building stage: Building Docker image and run container') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:v1 ."
                    // Run Docker container
                    sh "docker run -d -p 8700:3040 --name my-container ${DOCKER_IMAGE}:v1"
                    echo 'Docker image built and container started successfully'
                }
            }
        }

        stage('Testing stage: Test the code using jest testing units') {
            steps {
                script {
                    // Execute tests inside Docker container
                    sh "docker exec my-container /bin/bash -c 'cd /app && npm test'"
                    echo 'Code tested successfully'
                }
            }
        }

        stage('Deploying stage: Using Docker Compose') {
            steps {
                script {
                    // Use Docker Compose to deploy to a test environment
                    sh 'docker-compose -f Docker-compose.yaml up -d'
                    echo 'Code deployed to test environment successfully'
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker containers
            script {
                sh 'docker stop my-container'
                sh 'docker rm my-container'
                echo 'Clean up completed.'
            }
        }
    }
}
