/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.ufrj.minerveditor;

import java.util.*;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Avell B154 PLUS
 */
@ServerEndpoint("/endpoint")
public class TinyEndpoint {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public String onMessage(String message) {

        return message + " (from your server)";
    }

    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
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
