import React, { useCallback, useContext, useEffect, useState } from 'react'
import { socketContext } from '../context/SocketContext'
import peer from '../services/Peer'
import ReactPlayer from 'react-player'

const Videochat = () => {

  const {socket} = useContext(socketContext)
  const [remotesocketid,setremotesocketid] = useState(null)
  const [mystream,setmystream] = useState()
  const [remotestream,setremotesream]  =useState()

  const handleuserjoin = useCallback(({user,socketid})=>{
    console.log('user joined')
    setremotesocketid(socketid)
  },[])

  const handlecalluser = useCallback(async()=>{
    const stream = await navigator.mediaDevices.getUserMedia(
      {
        video:true,
        audio:true
      });
      const offer = await peer.getOffer();
      console.log('offer',offer)
      socket.emit('user:call',{to:remotesocketid,offer});
      setmystream(stream)
      
  },[remotesocketid,socket])

  const handleincomingcall = useCallback(async({from,offer})=>{
    setremotesocketid(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio:true,
      video:true
    });
    setmystream(stream);
    console.log('incoming call')
    const ans = await peer.getAnswer(offer);
    console.log('ans',ans)
    socket.emit('call:accepted',{to:from,ans})
  },[socket])

  const sendStreams = useCallback(()=>{
    if(mystream)
    {
      // const senders = Peer.gets
      const senders = peer.peer.getSenders();
      

      for(const track of mystream.getTracks()){
        const senderexists = senders.some(sender=>sender.track === track)
        if(!senderexists)
        {
          peer.peer.addTrack(track,mystream);
        }
      }
    } 
    
  },[mystream])

  const handlecallaccepted = useCallback(async({from,ans})=>{
    peer.setLocalDescription(ans);
    console.log('call accepted',ans);
    sendStreams()
  },[sendStreams])

  const handlenegoneeded = useCallback(async()=>{
    const offer = await peer.getOffer();
    console.log('nego needed')
    socket.emit('peer:nego:needed',{offer,to:remotesocketid})
  },[remotesocketid,socket])


  useEffect(()=>{
    peer.peer.addEventListener('negotiationneeded',handlenegoneeded)

    return ()=>{
    peer.peer.removeEventListener('negotiationneeded',handlenegoneeded)
    }
  },[handlenegoneeded])

 

  const handlenegoincomming = useCallback(async({from,offer})=>{
    const ans = await peer.getAnswer(offer);
    console.log('nego done')
    socket.emit('peer:nego:done',{to:from,ans})
  },[socket])

  const handlenegofinal = useCallback(async({from,ans})=>{
    console.log('nego final')
    await peer.setLocalDescription(ans);
  },[])

  useEffect(()=>{
    peer.peer.addEventListener('track',async(ev)=>{
      const Remotestream =  ev.streams;
      console.log(Remotestream[0])
      setremotesream(Remotestream[0])
    })
  },[])

  useEffect(()=>{
    socket.on('user:joined',handleuserjoin)
    socket.on('call:incoming',handleincomingcall)
    socket.on('call:accepted',handlecallaccepted)
    socket.on('peer:nego:needed',handlenegoincomming)
    socket.on('peer:nego:final',handlenegofinal)

    return ()=>{
    socket.off('user:joined',handleuserjoin)
    socket.off('call:incoming',handleincomingcall)
    socket.off('call:accepted',handlecallaccepted)
    socket.off('peer:nego:needed',handlenegoincomming)
    socket.off('peer:nego:final',handlenegofinal)

    }
  },[socket])


  return (
    <div>
      {mystream && <button className='border border-black' onClick={sendStreams} >send stream</button>}
      {remotesocketid && <button className='border border-black' onClick={handlecalluser}>call</button>}
      {/* <button onClick={handlecalluser} className='border border-black'>Call</button> */}
      {mystream &&<ReactPlayer url={mystream} playing muted/>}
      {remotestream && <ReactPlayer url={remotestream} height={'200px'} width={'400px'} playing muted/>}
    </div>
  )
}

export default Videochat
