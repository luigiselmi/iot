Docker Swarm 
============
The trusted connectors can be deployed on a cluster of nodes (or virtual machines). In this page is described the deployment of an example applications 
that uses a data provider connector and a consumer connector whose docker containers will be deployed in two hosts. The trusted connector's source code 
is hosted on Github. You can follow the documentation to build the Core Platform. After the build of the source code you have to build the docker images 
for both trusted connectors. The images can be build from the provided docker-compose files. Note that all docker swarm node should build these docker 
images. 

## Docker networks 

All the containers of the consumer connector will be member of the "consumer" network and will all be deployed in the same node. All the containers of 
any provider connector will be member of a "provider" network and will be deployed in the same node, different from the consumer connector node. 

Before deploying the services, one important step is to create some external and attachable networks in overlay driver. In this case, network "webnet", 
"provider" and "consumer" will be created using the following command: 


    $ docker network create -d overlay --attachable webnet 

    $ docker network create -d overlay --attachable provider 

    $ docker network create -d overlay --attachable consumer 


The following link shows how to use an overlay network https://docs.docker.com/network/overlay/ 

## Service Deployment 

The example application will deploy a consumer connector and two provider connectors. A trusted 3rd party service (ttp) should also be deployed. From the 
trusted-connector repository root folder 

    $ cd examples/example 

The services of provider and consumer should be created on the stack "gec" for example, using the following command line: 

    $ docker stack deploy -c docker-compose-ttp.yaml gec 

    $ docker stack deploy -c docker-compose-consumer.yaml gec 

    $ docker stack deploy -c docker-compose-provider1.yaml gec 

    $ docker stack deploy -c docker-compose-provider2.yaml gec 


The following link https://docs.docker.com/get-started/part4/ shows the detail how services running on swarm. 

All configurations of services are also in those files, docker-compose-provider.yaml and docker-compose-consumer.yaml. Provider and consumer are separately 
deployed on two nodes. The overlay network should be external and attachable. 

## Useful Commands 

Check swarm nodes                       

    $ docker node ls 

Check service info                        

    $ docker service ls 

Check specific service 

    $ docker service ps <service_name> --no-trunc 

Remove all services 

    $ docker service rm $(docker service ls -q) 

Install ping in a container 

    # apt install iputils-ping     

Leave swarm(on worker node) 

    $ docker swarm leave 

Remove node 

    $ docker node rm <node_id> 

Add worker node  

    $ docker swarm <join-token> worker   

(Then swarm will show a command, run this command on worker node) 

When deploying a new container on a swarm node remember to check whether its image is available on that node. If not you have first to pull it, if the 
image is available from a docker repository, or build it from its docker file.  

 
