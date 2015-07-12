/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.ufrj.minerveditor;

import java.io.IOException;
import java.util.*;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Avell B154 PLUS
 */
@ServerEndpoint("/endpoint")
public class TinyEndpoint {

    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    private static String message;

    @OnMessage
    public void onMessage(String message) throws IOException {
        this.message = message;
        for(Session session: peers) {
            System.out.println("message: " + message + "=");
            System.out.println("length: " + message.length());
            session.getBasicRemote().sendText(message);
        }
    }

    @OnOpen
    public void onOpen(Session peer) throws IOException {
        peers.add(peer);
        peer.getBasicRemote().sendText(message);
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }

    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }
}
