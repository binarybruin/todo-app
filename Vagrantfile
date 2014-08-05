# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"
Vagrant.require_version ">= 1.3.5"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    ## Box
    config.vm.box = "django-trusty-base"
    config.vm.box_url = "http://vagrant-files.bl1tz.me/django-trusty-base.box"

    ## Networking
    config.vm.network :forwarded_port, guest: 8000, host: 8000 # local dev
    config.vm.network :forwarded_port, guest: 5432, host: 5432 # postgresql
    
    config.ssh.forward_agent = true
    ## Shares
    config.vm.synced_folder "cloudseed/current/srv/", "/srv/"
    config.vm.synced_folder "./", "/var/www/"
    

    ## Box Specs
    config.vm.provider "virtualbox" do |v|
      #v.name = "ProjectName"
      v.customize ["modifyvm", :id, "--cpus", "2"]
      v.customize ["modifyvm", :id, "--memory", "2048"]
      v.customize ["modifyvm", :id, "--ioapic", "on"]
    end

    ## Provisioning: Salt GitFS requirements
    config.vm.provision :shell, :inline => "python -c \"import gitdb, git\"; if [ $? -ne 0 ]; then sudo apt-get update; sudo apt-get install python-dev git-core curl -y; curl --silent --show-error --retry 5 https://bootstrap.pypa.io/get-pip.py | sudo python; sudo pip install \"GitPython==0.3.2.RC1\" gitdb; fi"

    ## Salt:
    config.vm.provision :salt do |salt|
        salt.run_highstate = true
        salt.install_master = true
        salt.master_config = "cloudseed/current/salt/master"
        salt.minion_config = "cloudseed/current/vagrant/minion"
        salt.minion_key = "cloudseed/current/vagrant/minion.pem"
        salt.minion_pub = "cloudseed/current/vagrant/minion.pub"
        salt.seed_master = {minion: "cloudseed/current/vagrant/minion.pub"}
        salt.verbose = true
        
        salt.install_type = "git"
        salt.install_args = "v2014.1.4"
        salt.bootstrap_options = "-F -U -K -D -M"
        end

end