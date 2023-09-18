class PeerService{
    constructor()
    {
        this.peer = null
        // if(!this.peer){
        //     this.peer = new RTCPeerConnection({
        //         iceServers:[
        //             {
        //                 urls:[
        //                     "stun:stun.l.google.com:19302",
        //                     "stun:global.stun.twilio.com:3478",
        //                 ],
        //             },
        //         ],
        //     })
        // }
        this.configuration = {
            iceServers:[
                {
                    urls:[
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        }
    }

    initializepeer(){
        if(!this.peer || this.peer.signalingState === 'closed')
        {
            this.peer = new RTCPeerConnection(this.configuration)
        }
    }

    async getAnswer(offer) {
        this.initializepeer();
        // if(this.peer){

            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        // }
    }

    async setLocalDescription(ans){
        this.initializepeer();
        // if(this.peer)
        // {

            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        // }
    }

    async getOffer() {
        this.initializepeer();
        // if(this.peer)
        // {
            
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        // }
    }

    closepeer()
    {
        if(this.peer)
        {
            this.peer.close();
            this.peer = null;
        }
    }
}

export default new PeerService()
